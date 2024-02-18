

# World Images App

The World Images App is a Vue 3 application designed to showcase a variety of images from around the world, allowing users to participate in a unique image selection race. It leverages Vue 3's Composition API, Pinia for state management, and Vite as the build tool. The app also utilizes Tailwind CSS for styling and Radix UI components for accessible UI components.

## Features

- **Image Race**: Users can participate in an image selection race to discover and select their favorite images.
- **Dynamic Theming**: Supports light and dark themes, toggled via a UI button.
- **Responsive Design**: Tailored for a wide range of devices with responsive design.
- **Accessibility**: Utilizes Radix UI components to ensure accessibility standards are met.

## Demo

[Demo URL](https://world-images-xi.vercel.app)

## Project Setup

To get started with the World Images App, clone the repository and install the dependencies:

```bash
git clone https://github.com/yordi024/world-images.git
cd world-images
npm install
```
### Environment Variables

Create a .env file or copy .env.example and paste the following environment variables. Then, go to [Pixabay docs](https://pixabay.com/api/docs/) create an account and get your API_KEY.

```bash
VITE_API_URL='https://api.alegra.com/api/v1'
VITE_PIXABAY_URL='https://pixabay.com/api'
VITE_PIXABAY_API_KEY
```

You need an Alegra account to perform API calls. If you don't have one, you can create one [here](https://app.alegra.com/user/register/).

### Development Server

Run the following command to start the development server:

```bash
npm run dev
```

### Build for Production

To build the application for production, use:

```bash
npm run build
```

### Running Tests

Execute unit tests with:

```bash
npm run test:unit
```

Verify tests coverage with:
```bash
npm run coverage
```
