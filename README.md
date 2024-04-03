# E-commerce Filters Example

This project is a simple demonstration of implementing filters in an e-commerce application. The main goal is to provide a practical example of how filters can be used to enhance the user experience in an e-commerce app.

In this project, filters are entirely controlled by the server. The server generates the required props for filter components, including the active and deactive states of the filters. The client is designed to process the data received from the server, with no additional filter logic on the client side.

All filters are written into the URL query. Every time a filter is selected or changed, two requests are sent to the server - one for filters and the other for products. In both requests, the URL query is sent to the server. The server parses, transforms, and processes this query.

`GET /filters` Server generates queries for the new filters, changes the active state of the filters based on the IDs in the query, and sends the generated filters to the client.</br>
`GET /products` Server sends the products that match the filters in the query to the client.

## Data

For simplicity, this project does not use a real database. Instead, it uses seed([server/src/seed.ts](https://github.com/sevilgurkan/ecommerce-filters/blob/main/packages/server/src/seed.ts)) data to simulate the behavior of an e-commerce application. This makes it easier to understand the core concepts without getting bogged down in database details.

I didn't include internationalization. As you'll see in the [demo](#demo), I used Turkish, which is my native language, for this project.

In the [server/src/index.ts](https://github.com/sevilgurkan/ecommerce-filters/blob/main/packages/server/src/index.ts#L12) file,

```js
seed({ recreateOnEveryRefresh: false })
```

If you set this to `true`, it will regenerate all data on every save operation. This way, you can use the filters with the different values that will be generated."

## Demo

https://github.com/sevilgurkan/ecommerce-filters/assets/48570819/e800b1c9-b225-4c6a-9a79-b7f1d4fb018f

## Features

- Fetch Data from API
- URL-Based Filtering: Filters can be added or changed through the URL. <br />e.g. "?gender=1&rd=true&fc=true&sst=BESTSELLER".
- Product Filtering: Products can be filtered by brand, price, gender, and more.
- Product Sorting: Sort products by price, recentness, best-seller status, etc.
- Quick Filters: Easily access commonly used filters for quick selection.
- Add to Basket
- Basket Page: View, manage, and remove items from your shopping basket.
- Infinite Scroll: More products are loaded as you scroll down.

## Used

- React/Nextjs
- Nodejs/Express
- Tailwindcss
- Vitest

## Setup

```
git clone https://github.com/sevilgurkan/ecommerce-filters.git
cd ecommerce-filters
npm install
npm run dev
```

## Test

```
npm run test
```
