mod infrastructure {
    pub mod integrations {
        pub mod lm_studio;
    }
}

use infrastructure::integrations::lm_studio::{lm_studio_chat, lm_studio_models};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![lm_studio_models, lm_studio_chat])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
