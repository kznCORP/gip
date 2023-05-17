import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>GIP - Group Itinerary Planner</title>
      </Head>

      <main>
        <div className="fixed top-0 left-0 h-screen w-1/6 m-0 flex flex-col bg-slate-300 ">
          <i>Overview</i>
          <i>Schedule</i>
          <i>Packing List</i>
          <i>Expenses</i>
        </div>
      </main>
    </>
  );
}
