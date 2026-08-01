# Reset Body Lab

Branded client-owned Next.js site for Reset Body Lab Pilates.

The reservation flow is powered by `@clicka1/booking` and stays native inside
the site. Services, staff/resources, slots, durations and bookings remain owned
by the Clicka engine.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Required environment values:

```bash
NEXT_PUBLIC_ENGINE_URL=https://app.alternine.co
NEXT_PUBLIC_BOOKING_API_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SALON_SLUG=reset-body-lab
NEXT_PUBLIC_SITE_URL=https://resetbodylab.com
NEXT_PUBLIC_PRIMARY_SERVICE_ID=pilates-bed
```

`NEXT_PUBLIC_PRIMARY_SERVICE_ID` must match the real service id from Clicka.

## Booking Configuration

Configure these in the Clicka engine/admin, not in this client site:

- 5 bookable reformer beds as the salon capacity/resource setup
- 50-minute Pilates service duration
- working hours, blocked times and staff/resources
- prices, deposits and cancellation rules

This site only opens the booking modal and passes the selected service id.
