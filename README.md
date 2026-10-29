# HB Fit Enterprise Portal

A secure, role-based enterprise web application built with React Native (Expo Web) and Supabase, featuring restricted corporate domain authentication and dynamic user access management.

## Live Deployment
* Production URL: https://hbfit.vercel.app



## Setup Instructions

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Local Development Setup
1. Clone the repository:
   git clone https://github.com/sanya-044/hbfit.git
   cd restricted-auth-app

2. Install dependencies:
   npm install

3. Create a .env file in the root directory and configure your Supabase credentials:
   EXPO_PUBLIC_SUPABASE_URL=my superbase key
   EXPO_PUBLIC_SUPABASE_ANON_KEY=***

4. Run the application locally for web:
   npx expo start --web