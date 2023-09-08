import "./globals.css";

import { AuthContextProvider } from "@/lib/authContext";
import { FinanceContextProvider } from "@/lib/financeContext";
import { ModalContextProvider } from "@/lib/modalContext";
import { PackingContextProvider } from "@/lib/packingContext";
import { ScheduleContextProvider } from "@/lib/scheduleContext";

const allComponents = [
  AuthContextProvider,
  FinanceContextProvider,
  ModalContextProvider,
  PackingContextProvider,
  ScheduleContextProvider,
];

function AllProviders({ components = [], children }) {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        const [GivenComponent, givenProps] = Array.isArray(Comp)
          ? Comp
          : [Comp, {}];
        return <GivenComponent {...givenProps}>{acc}</GivenComponent>;
      }, children)}
    </>
  );
}

export const metadata = {
  title: "GIP - Group Itinerary Planner",
  description:
    "Make planning a trip easy so all you have to do is just show up. Have everyone on the same page using features such as live collaboration, voting for suggestions, poll for answers from your group, packing lists, expense tracking and more!",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <AllProviders components={allComponents}>{children}</AllProviders>
        </body>
      </html>
    </>
  );
}
