# NexBuy-Product Management App

A simple Next.js 15 application with authentication and product management features. This app includes public pages for browsing products and protected pages for managing products after login.

## Setup & Installation

Clone the repository:

```bash
git clone <https://github.com/AbrarShazid/nexbuy.git>
```

## Install dependencies:

```bash
npm install
# or
yarn install
```

## Route Summary

### Public Routes
- `/` → Landing page with hero section and product highlights  
- `/login` → Authentication page with Google login  
- `/products` → List of all available products  
- `/products/[id]` → Detailed view of a specific product  

### Protected Routes
- `/dashboard` → Detailed view of dashboard  
- `/dashboard/add-product` → Form to add new products (requires authentication)  

