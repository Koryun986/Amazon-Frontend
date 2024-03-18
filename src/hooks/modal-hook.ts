import {useState} from "react";

export default function useModal() {
    const [isActive, setIsActive] = useState<boolean>(false);

    function openModal() {
        setIsActive(true);
    }

    function closeModal() {
        setIsActive(false);
    }

    return {
        isActive,
        openModal,
        closeModal,
    };
}