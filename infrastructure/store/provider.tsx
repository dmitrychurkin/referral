import { memo, PropsWithChildren } from "react";
import { Provider } from "react-redux";

import createStore from './factory';


type Props = PropsWithChildren<
    & { readonly store?: ReturnType<typeof createStore>; }
    & typeof defaultProps
>;

const defaultProps = {
    store: createStore()
};

const StoreProvider = (props: Props) => (
    <Provider {...props} />
);

StoreProvider.defaultProps = defaultProps;

export default memo(StoreProvider);
