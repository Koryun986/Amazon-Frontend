import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function useFilterByParams<T>(value: T | null | T[], param: string) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathName = usePathname();

    const handleDebouncedValueChange = () => {
        const params = new URLSearchParams(searchParams);
        if (Array.isArray(value)) {
            if (!value.length) {
                params.delete(param);
            } else {
                for(const item of value) {
                console.log("value", item)
                    params.append(param, item);
                }
            }
        } else {
            if (!value) {
                params.delete(param);
            } else {
                params.set(param, value);
            }
        }
        replace(`${pathName}?${params.toString()}`);
    };

    useEffect(() => {
        handleDebouncedValueChange();
    }, [value])
}