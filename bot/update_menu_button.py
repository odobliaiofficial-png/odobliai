import urllib.request
import json
import os
from config import BOT_TOKEN

LIVE_URL = os.getenv("MINI_APP_URL", "https://odobli-ai-web.vercel.app")

def update_telegram_menu_button():
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/setChatMenuButton"
    payload = {
        "menu_button": {
            "type": "web_app",
            "text": "Pazanda AI Mini App",
            "web_app": {
                "url": LIVE_URL
            }
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode())
            print("✅ Telegram Chat Menu Button Updated:", res)
            return True
    except Exception as e:
        print("❌ Error updating menu button:", e)
        return False

if __name__ == "__main__":
    update_telegram_menu_button()
