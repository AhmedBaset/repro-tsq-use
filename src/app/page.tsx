"use client";

import { useQuery } from "@tanstack/react-query";
import { Suspense, use } from "react";

export default function Page() {
	const { data, promise } = useQuery({
		queryKey: ["test"],
		queryFn: async () => {
			// await new Promise((resolve) => setTimeout(resolve, 3000));
			return "test";
		},
		experimental_promise: true,
	});

	return (
		<div>
			<h1>Hello World</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<Component
					data={data}
					// promise={new Promise((res) => setTimeout(res, 3000))}
					promise={promise}
				/>
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
