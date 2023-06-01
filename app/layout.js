import "./globals.css";

import { AuthContextProvider } from "@/lib/authContext";
import { FinanceContextProvider } from "@/lib/financeContext";

export const metadata = {
  title: "GIP - Group Itinerary Planner",
  description:
    "Make planning a trip easy so all you have to do is just show up. Have everyone on the same page using features such as live collaboration, voting for suggestions, poll for answers from your group, packing lists, expense tracking and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>{children}</FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
