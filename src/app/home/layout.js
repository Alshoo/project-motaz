// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";





export default async  function HomeLayout({ children }) {  

  // const session = await getServerSession(authOptions);


  // console.log(session);
  // console.log(session);
  // console.log(session);
  // console.log(session);
  
  return (
        <html lang="en">



        <body
        >
          {/* <h1>Welcome {session?.user?.name || "Guest"}</h1> */}

        {children}

        </body>
      </html>
  );
}
