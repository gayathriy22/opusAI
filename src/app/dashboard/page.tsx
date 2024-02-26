'use client';
import { UserInfoResponse } from "@/lib/google-oauth2";
import { FormEvent, useEffect, useState } from "react";

async function handleSubmit (event: FormEvent) {
  event.preventDefault();
  const elements = (event.target as HTMLFormElement).elements as any;
  const body = JSON.stringify({
    name: elements.name.value,
    priority: Number(elements.priority.value)
  });
  const response = await fetch('/api/tasks', { method: 'POST', body }).then(x => x.json());
  console.log(response);
  return response.success;
}

function Page() {
  const [user, setUser] = useState<UserInfoResponse | undefined>(undefined);
  const [taskJSON, setTaskJSON] = useState('<no response yet>');
  useEffect(() => {
    fetch(`/api/me`).then(x => x.json()).then(setUser)
  }, [])

  return <div>
    <div className="topbar">
      <i>(This should definitely be in a component)</i>
      <br />
      <h1>Hello</h1>
      <h1>{user?.given_name}</h1>

      <br /><br />
      <form action="/" onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <label>
          <span>Give your task a name</span><br />
          <input type="text" placeholder='Task name' name='name' />
        </label>
        <br /><br />
        <label>
          <span>Set a priority (1 = today, 2 = later)</span><br />
          <input type="number" min="1" max="2" name='priority' />
        </label>
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>
      <br /><br />

      <button onClick={async () => {
        const tasks = await fetch('/api/tasks').then(x => x.json());
        setTaskJSON(JSON.stringify(tasks, null, 2));
      }}>List Tasks</button>
      <pre>{taskJSON}</pre><br /><br />

      <a href="/api/logout">Logout</a>
    </div>
  </div>
}


export default Page;
