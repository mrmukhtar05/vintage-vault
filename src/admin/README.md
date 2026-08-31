# Vintage Vault Admin Panel

## Folder structure

src/
└── admin/
    ├── Admin.jsx
    ├── ProtectedRoute.jsx
    ├── index.js
    ├── components/
    │   ├── AdminLayout.jsx
    │   ├── OrderTable.jsx
    │   ├── SectionTitle.jsx
    │   ├── StatCard.jsx
    │   └── admin.css
    └── pages/
        ├── Dashboard.jsx
        ├── Products.jsx
        ├── Orders.jsx
        ├── Customers.jsx
        └── Settings.jsx

## Existing project dependencies

This admin uses your existing:
- AuthContext
- ProductsContext
- OrdersContext
- React Router DOM

It also expects your existing Tailwind/theme variables to be present, but the admin has its own CSS so it does not depend on Tailwind for layout.

## App.jsx

Keep:
import Admin from "./admin/Admin";

Change:
<Route path="/admin" element={<Admin />} />

To:
<Route path="/admin/*" element={<Admin />} />

The `/*` is required for the admin child routes:
- /admin
- /admin/products
- /admin/orders
- /admin/customers
- /admin/settings
