# Istanbul Emergency Assistance Application

A comprehensive mobile-first application designed for emergency preparedness and response in Istanbul. It provides crucial information, communication tools, and resource management features, accessible even in offline mode.

## Key Features

-   **Emergency Information Hub:** Access critical alerts, guidelines, and contact numbers for agencies like AFAD and İBB.
-   **Offline First:** Core functionalities are designed to be accessible without an active internet connection, ensuring reliability during infrastructure outages.
-   **Interactive Maps:** View designated safe zones, emergency assembly points, and locations of critical facilities.
-   **Mesh Network Communication:** Enables peer-to-peer or group messaging through alternative networks when conventional communication channels are unavailable.
-   **Community Response Coordination:** Tools to help organize local efforts, track tasks, and manage shared resources during an emergency.
-   **Real-time Updates:** Displays the latest advisories and news (fetched when connection is available or via semi-offline channels) relevant to the ongoing situation.
-   **Quick Access Interface:** A clean, intuitive UI with quick access to all essential modules like Maps, Communication, Emergency Info, and Community Help.
-   **Battery Status Monitoring:** Provides information about the device's battery level, crucial during power outages. (Saw `BatteryStatus.tsx`)
-   **Network Status Indicator:** Shows current network connectivity status. (Saw `NetworkStatus.tsx`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm (comes with Node.js) or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
    *(TODO: Replace with actual repository URL if available, otherwise use a placeholder)*

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using bun:
    ```bash
    bun install
    ```

3.  **Run the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using bun:
    ```bash
    bun run dev
    ```
    This will typically start the application on `http://localhost:5173` (for Vite) or another port specified in the output.

## Technologies Used

This project is built with a modern web development stack:

-   **Frontend Framework:** React
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** Shadcn/UI
-   **Mapping:** Mapbox GL JS (for interactive maps)
-   **Routing:** React Router DOM
-   **Data Fetching/State Management:** TanStack Query (React Query)
-   **Package Managers (Choice of):** npm, bun

## Contributing

Contributions are welcome and greatly appreciated! If you have suggestions for improving the application, please feel free to fork the repository and submit a pull request.

To contribute:

1.  **Fork the Project:** Click the 'Fork' button at the top right of this page.
2.  **Create your Feature Branch:**
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **Commit your Changes:**
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Push to the Branch:**
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  **Open a Pull Request:** Navigate to the original repository and open a pull request from your forked branch.

Please try to follow the existing coding style and add comments where necessary. If you plan to make significant changes, it's a good idea to open an issue first to discuss your ideas.

## License

This project is currently pending a license. Please check back later for updates on licensing information.

*(TODO: Add a `LICENSE` file to the repository (e.g., MIT, Apache 2.0) and update this section accordingly.)*
