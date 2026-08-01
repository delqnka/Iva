import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="return-page">
      <section>
        <p className="eyebrow">Резервацията е приета</p>
        <h1>Часът е запазен.</h1>
        <p>
          Ще получиш потвърждение според настройките на Reset Body Lab.
        </p>
        <Link className="btn btn-dark" href="/">
          Обратно към сайта
        </Link>
      </section>
    </main>
  );
}
