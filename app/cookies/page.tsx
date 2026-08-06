import Link from "next/link";
import { loadSiteInfo } from "../site-info";

export default async function CookiesPage() {
  const site = await loadSiteInfo();

  return (
    <main className="legal-page">
      <div className="legal-shell">
        <Link className="legal-back" href="/">
          Към сайта
        </Link>
        <div className="legal-prose">
          <p className="section-label">Правна информация</p>
          <h1>Политика за бисквитки</h1>
          <p>
            Сайтът на {site.salonName} използва само необходимите технологии за
            работа на основните функции и външни услуги при изрично съгласие.
          </p>
          <h2>Необходими</h2>
          <p>
            Те са нужни за базовата работа на сайта и резервационния поток.
          </p>
          <h2>Функционални и външни услуги</h2>
          <p>
            Google Maps и бъдещи външни вграждания могат да поставят свои cookies
            едва след съгласие от посетителя.
          </p>
          <h2>Управление на избора</h2>
          <p>
            При първо посещение се показва банер. Изборът може да бъде променен
            чрез изчистване на данните в браузъра или бъдещ control panel за cookies.
          </p>
          <h2>Контакт</h2>
          <p>
            За въпроси относно cookies и поверителност:{" "}
            {site.email || "имейла на студиото"}.
          </p>
        </div>
      </div>
    </main>
  );
}
