import {
    useEffect,
    FormEventHandler,
    ReactNode,
    createRef,
    FormEvent,
    useCallback,
} from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

type LoginPropsType = {
    status?: string;
    canResetPassword: boolean;
    to: string | null;
    simulateFormInput?: {
        email: string;
        password: string;
    };
};

export type LoginFormDataType = {
    email: string;
    password: string;
    remember: boolean;
    to: string | null;
};

const Login = (props: LoginPropsType) => {
    const { data, setData, post, processing, errors, reset } =
        useForm<LoginFormDataType>({
            email: props.simulateFormInput?.email || "",
            password: props.simulateFormInput?.password || "",
            remember: true,
            to: props.to || "",
        });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (event: FormEvent | null = null) => {
        if (event != null) event.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />

            {props.status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {props.status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {props.canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Link href={route("welcome")}>
                        <SecondaryButton
                            className="ms-4 float-left"
                            disabled={processing}
                        >
                            &larr; Back
                        </SecondaryButton>
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
};

Login.layout = (page: ReactNode) => <GuestLayout children={page} />;

export default Login;
