'use client';
import { UserInfoResponse } from "@/lib/google-oauth2";
import { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState<UserInfoResponse | undefined>(undefined);
  useEffect(() => {
    fetch(`/api/me`).then(x => x.json()).then(setUser)
  }, [])

  return <div>
    <div className="topbar">
      <i>(This should definitely be in a component)</i>
      <br />
      <h1>Hello</h1>
      <h1>{user?.given_name}</h1>

      <a href="/api/logout">Logout</a>
    </div>
  </div>
}


export default Page;
