import useUser from '@lib/client/useUser';

export default function Profile() {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <div>
      <h1>Welcome! {user?.name}</h1>
      <h2>Your email is :{user?.email}</h2>
    </div>
  );
}
