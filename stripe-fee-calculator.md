---
layout: tool
title: Stripe Fee Calculator | Find What You Should Charge
permalink: /stripe-fee-calculator/
description: Calculate how much Stripe will charge in processing fees, and how much to invoice to receive a target amount after fees.
---

<link rel="stylesheet" href="{{ '/assets/stripe-fee-calculator/calculator.css' | relative_url }}">

<div id="stripe-fee-calculator" class="stripe-fee-calculator"></div>

<div class="sfc-faq" markdown="1">

## How much does Stripe charge per transaction?

Stripe fees depend on the payment method. Domestic card payments are usually **2.9% + 30¢** per successful transaction. International cards, currency conversion, and manually entered cards add extra percentage fees on top.

Rates vary by payment method — bank debits like ACH can be as low as **0.8%** (with a cap), while buy-now-pay-later options like Klarna or Affirm run **5–8% + fixed fee**. See [Stripe's local payment methods pricing](https://stripe.com/pricing/local-payment-methods) for the full list.

## What does "You should ask for" mean?

If you want to **receive** a specific amount after Stripe takes its cut, this field shows the invoice amount you need to charge. For example, to net $100 with standard domestic card fees (2.9% + 30¢), you'd need to charge **$103.30**.

## Do Stripe fees vary by country?

Yes. The presets in this calculator reflect US pricing from Stripe's website. Fees and available payment methods differ by country. Check your [local Stripe pricing page](https://stripe.com/pricing) for rates in your region.

</div>

<script src="{{ '/assets/stripe-fee-calculator/presets.js' | relative_url }}"></script>
<script src="{{ '/assets/stripe-fee-calculator/calculator.js' | relative_url }}" defer></script>
