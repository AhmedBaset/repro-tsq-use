"use client";

import { useQuery } from "@tanstack/react-query";
import { Suspense, use } from "react";

// Because `next build` never completes since it can't generate static page for infinite page
export const dynamic = "force-dynamic";

export default function Page() {
	const { data, promise } = useQuery({
		queryKey: ["test"],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 2500));
			return "Success";
		},
		experimental_promise: true,
	});

	return (
		<div>
			<h1 style={{ marginBottom: "1rem" }}>Hello World</h1>
			<Suspense fallback={<div>Suspending for a few seconds...</div>}>
				<Component data={data} promise={promise} />
			</Suspense>
		</div>
	);
}

function Component({
	data,
	promise,
}: {
	data: string | undefined;
	promise: Promise<string>;
}) {
	use(promise);

	return <div>{data}</div>;
}

// function Component() {
// 	// if (!data) use(promise);
// 	const { data } = useSuspenseQuery({
// 		queryKey: ["test"],
// 		queryFn: async () => {
// 			// await new Promise((resolve) => setTimeout(resolve, 3000));
// 			return "test";
// 		},
// 		experimental_promise: true,
// 	});

// 	return <div>{data}</div>;
// }
