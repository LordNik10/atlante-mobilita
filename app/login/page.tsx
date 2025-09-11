import { login } from "./actions";

export default async function Login() {
  return (
    <div className="text-center">
      <p className="text-lg">Welcome to our platform!</p>
      <p className="text-sm text-gray-500">
        Please sign in to access your account.
      </p>
      <form>
        <button
          formAction={login}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <div className="flex items-center gap-2">
            <span>Sign in with Google</span>
          </div>
        </button>
      </form>
    </div>
  );
}
