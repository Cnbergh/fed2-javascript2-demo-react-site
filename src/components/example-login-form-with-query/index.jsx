import { login } from "../../lib/my-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

function ExampleLoginFormWithQuery() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (username, password) => login(username, password),
    onSuccess: (data) => {
      navigate({ to: "/", params: { id: data.id } });
    },
  });

  return (
    <div>
      {loginMutation.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {loginMutation.isError ? (
            <div>An error occurred: {loginMutation.error.message}</div>
          ) : null}

          {loginMutation.isSuccess ? <div>Login SUccessful</div> : null}

          <button
            onClick={() => {
              loginMutation.mutate({
                username: "kminchelle",
                password: "0lelplR",
              });
            }}
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
}

export default ExampleLoginFormWithQuery;
