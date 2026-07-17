# LM Studio

The frontend adapter lives in `frontend/src/infrastructure/integrations/lm-studio/`; the native adapter lives in `src-tauri/src/infrastructure/integrations/`. Feature UI must not call Tauri or LM Studio directly.

Route all requests through Tauri commands because direct WebView requests are unreliable with LM Studio's CORS behavior. Evidence suggestions use native `/api/v1/chat`, disable reasoning, and list only models with a loaded instance. Validate model output before display or storage, and require user confirmation before saving a suggestion as evidence.
