import "./globals.css";

import { AuthUserProvider } from "@/lib/firebase/auth";
import { FinanceContextProvider } from "@/lib/financeContext";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "GIP - Group Itinerary Planner",
  description:
    "Make planning a trip easy so all you have to do is just show up. Have everyone on the same page using features such as live collaboration, voting for suggestions, poll for answers from your group, packing lists, expense tracking and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthUserProvider>
          <FinanceContextProvider>
            <Navigation />
            {children}
          </FinanceContextProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
