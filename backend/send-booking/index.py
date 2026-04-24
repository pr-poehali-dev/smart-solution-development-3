import json
import os
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText

def send_telegram(bot_token: str, chat_id: str, text: str) -> bool:
    """Отправка сообщения через Telegram Bot API"""
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            return result.get("ok", False)
    except Exception:
        return False

def handler(event: dict, context) -> dict:
    """Отправка заявки на бронирование на почту и/или в Telegram"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "bad json"})}

    name = body.get("name", "")
    phone = body.get("phone", "")
    date = body.get("date", "")
    plan = body.get("plan", "")
    email_to = body.get("email", "")
    telegram_chat_id = body.get("telegramChatId", "")
    email_enabled = body.get("emailEnabled", False)
    telegram_enabled = body.get("telegramEnabled", False)

    message_text = (
        f"🎵 <b>Новая заявка на бронирование!</b>\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"📅 Дата: {date}\n"
        f"🎟 Тариф: {plan or 'не указан'}"
    )

    results = {"telegram": None, "email": None}

    if telegram_enabled and telegram_chat_id:
        bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
        if bot_token:
            results["telegram"] = send_telegram(bot_token, telegram_chat_id, message_text)

    if email_enabled and email_to:
        results["email"] = "not_configured"

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "results": results}, ensure_ascii=False),
    }