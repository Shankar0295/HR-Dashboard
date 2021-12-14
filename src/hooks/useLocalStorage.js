import { useState, useEffect } from 'react'

const getLocalStorageValue = (key, defaultValue) => {
    //getting/retrive stored value form Local storage
    const savedValue = localStorage.getItem(key);
    const initialValue = JSON.parse(savedValue);
    return initialValue || defaultValue
}

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getLocalStorageValue(key, defaultValue)
    })

    useEffect(() => {
        //storing text every change/render
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
};

export default useLocalStorage;