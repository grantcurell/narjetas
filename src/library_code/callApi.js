/**
 * TODO
 * @returns TODO
 */
export default function callApi(isLoading, setIsLoading, apiFunctionPointer, data, setData, error, setError) {

    const execute = async (data, options = {}) => {
        try {
        setIsLoading(true);
        const todo = await apiFunctionPointer(data, options);
        setData(todo);
        return todo;
        } catch (e) {
        setError(e);
        setIsLoading(false);
        throw e;
        }
    };

    return {
        isLoading,
        error,
        data,
        execute,
    };
};