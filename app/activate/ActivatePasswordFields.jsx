import { Lock, Eye, EyeOff } from "lucide-react";

export default function ActivatePasswordFields({ state, dispatch }) {
  return (
    <>
      <div>
        <label
          htmlFor="activate-password"
          className="block text-sm font-medium text-zinc-300 mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            id="activate-password"
            type={state.showPassword ? "text" : "password"}
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
            placeholder="Min. 6 characters"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "SET_FIELD",
                field: "showPassword",
                value: !state.showPassword,
              })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            {state.showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="activate-confirm-password"
          className="block text-sm font-medium text-zinc-300 mb-1.5"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            id="activate-confirm-password"
            type={state.showPassword ? "text" : "password"}
            value={state.confirmPassword}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "confirmPassword",
                value: e.target.value,
              })
            }
            placeholder="Re-enter password"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
      </div>
    </>
  );
}
