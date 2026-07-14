use serde_json::Value;
use std::time::Duration;

const LM_STUDIO_MODELS_URL: &str = "http://127.0.0.1:1234/api/v1/models";
const LM_STUDIO_CHAT_URL: &str = "http://127.0.0.1:1234/api/v1/chat";

fn lm_studio_client(timeout: Duration) -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .timeout(timeout)
        .build()
        .map_err(|error| format!("Could not prepare the local LM Studio connection: {error}"))
}

async fn response_json(response: reqwest::Response) -> Result<Value, String> {
    let status = response.status();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Could not read LM Studio's response: {error}"))?;

    if !status.is_success() {
        return Err(format!(
            "LM Studio returned {}{}",
            status.as_u16(),
            if body.is_empty() {
                ".".to_string()
            } else {
                format!(": {}", body.chars().take(180).collect::<String>())
            }
        ));
    }

    serde_json::from_str(&body).map_err(|error| format!("LM Studio returned invalid JSON: {error}"))
}

#[tauri::command]
async fn lm_studio_models() -> Result<Value, String> {
    let response = lm_studio_client(Duration::from_secs(10))?
        .get(LM_STUDIO_MODELS_URL)
        .send()
        .await
        .map_err(|error| format!("LM Studio is offline or unreachable: {error}"))?;
    response_json(response).await
}

#[tauri::command]
async fn lm_studio_chat(payload: Value) -> Result<Value, String> {
    let response = lm_studio_client(Duration::from_secs(300))?
        .post(LM_STUDIO_CHAT_URL)
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Akasha could not reach LM Studio: {error}"))?;
    response_json(response).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![lm_studio_models, lm_studio_chat])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
