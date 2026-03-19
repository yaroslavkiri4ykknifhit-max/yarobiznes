// ============================================
// ⚙️ НАСТРОЙКИ TELEGRAM БОТА
// ============================================
//
// 📌 Инструкция:
// 1. Найдите @BotFather в Telegram
// 2. Отправьте /newbot и создайте бота
// 3. Скопируйте токен и вставьте ниже в BOT_TOKEN
// 4. Напишите боту /start (обязательно!)
// 5. Чтобы узнать свой CHAT_ID:
//    - Откройте: https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
//    - Найдите "chat":{"id": XXXXXXX} — это ваш CHAT_ID
// 6. Вставьте CHAT_ID ниже
//
// ⚠️ ВАЖНО: Вы ОБЯЗАТЕЛЬНО должны написать боту /start
//    перед тем как он сможет отправлять вам сообщения!
//
// ============================================

const BOT_TOKEN = "8662676537:AAHdmBkbv0X9DcncIiXQJcir8rdjuFFVjD8";
const CHAT_ID = "2117489924";

// ============================================

interface FormData {
  name: string;
  phone: string;
  business: string;
  service: string;
  message: string;
}

const serviceLabels: Record<string, string> = {
  site: "🌐 Сайт / лендинг",
  bot: "🤖 Telegram-бот",
  mini: "📱 Mini App в Telegram",
  all: "🔥 Комплекс (всё вместе)",
  idk: "❓ Не знает — нужна помощь",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendToTelegram(form: FormData): Promise<boolean> {
  // Проверяем что токен и chat_id заполнены
  if (
    !BOT_TOKEN ||
    BOT_TOKEN === "ВСТАВЬ_ТОКЕН_БОТА_СЮДА" ||
    !CHAT_ID ||
    CHAT_ID === "ВСТАВЬ_СВОЙ_CHAT_ID_СЮДА"
  ) {
    console.error(
      "❌ Telegram не настроен! Откройте файл src/telegram.ts и заполните BOT_TOKEN и CHAT_ID"
    );
    // Возвращаем true чтобы форма не показывала ошибку пользователю
    // (заявка просто логируется в консоль пока бот не настроен)
    console.log("📋 Данные заявки:", form);
    return true;
  }

  const now = new Date();
  const date = now.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const serviceName = serviceLabels[form.service] || "Не выбрана";

  const text = [
    `🔔 <b>НОВАЯ ЗАЯВКА С САЙТА</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 <b>Имя:</b> ${escapeHtml(form.name)}`,
    `📞 <b>Контакт:</b> ${escapeHtml(form.phone)}`,
    `🏢 <b>Бизнес/ниша:</b> ${escapeHtml(form.business || "—")}`,
    `🛠 <b>Услуга:</b> ${serviceName}`,
    ``,
    `💬 <b>Описание задачи:</b>`,
    `${escapeHtml(form.message || "—")}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📅 ${date} в ${time}`,
    `🌐 Источник: YaroBiznes сайт`,
  ].join("\n");

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ Telegram API error:", response.status, errorData);
      return false;
    }

    const data = await response.json();

    if (data.ok) {
      console.log("✅ Заявка успешно отправлена в Telegram!");
      return true;
    } else {
      console.error("❌ Telegram вернул ошибку:", data.description);
      return false;
    }
  } catch (error) {
    console.error("❌ Ошибка сети при отправке в Telegram:", error);
    return false;
  }
}
