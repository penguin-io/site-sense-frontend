"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthButtons = () => {
  const session = useSession();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (session.data?.user) {
      setSignedIn(true);
    }
  }, [session]);

  return (
    <>
      {!signedIn ? (
        <div className="w-max h-max px-3 py-1 rounded bg-blue-500 cursor-pointer" onClick={() => signIn()}>
          Sign in
        </div>
      ) : (
        <div className="w-max h-max px-3 py-1 rounded bg-yellow-500 cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </div>
      )}
    </>
  );
};

export default AuthButtons;
