import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <main className="return-page">
      <section>
        <p className="eyebrow">Резервацията не е завършена</p>
        <h1>Можеш да избереш друг час.</h1>
        <p>
          Върни се към сайта и отвори резервацията отново, когато си готова.
        </p>
        <Link className="btn btn-dark" href="/">
          Избери час
        </Link>
      </section>
    </main>
  );
}
