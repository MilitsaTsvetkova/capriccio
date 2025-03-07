import { ComponentType, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Loader } from "../components/Loader";
import { supabase } from "../supabaseClient";
import styles from "../utils.module.css";
import { Page } from "../utils/types";
import startPageScaffold from "./startPageScaffold.json";

type InjectedProps = {
  initialState: Page;
};

type PropsWithoutInject<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export const withInitialState = <P extends {}>(
  Component: ComponentType<PropsWithoutInject<P> & InjectedProps>
) => {
  return (props: PropsWithoutInject<P>) => {
    const match = useMatch("/:slug");
    const pageSlug = match ? match.params.slug : "start";
    const [initialState, setInitialState] = useState<Page | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      setIsLoading(true);
      const fetchInitialState = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) {
            throw new Error("User is not logged in");
          }
          const { data } = await supabase
            .from("pages")
            .select("title, id, cover, nodes, slug")
            .match({ slug: pageSlug, created_by: user.id })
            .single();

          if (!data && pageSlug === "start") {
            const result = await supabase
              .from("pages")
              .insert([
                { ...startPageScaffold, slug: "start", created_by: user.id },
              ])
              .single();
            setInitialState(result.data);
          } else {
            setInitialState(data);
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialState();
    }, [pageSlug]);

    if (isLoading) {
      return (
        <div className={styles.centeredFlex}>
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.centeredFlex}>
          <p>{error.message}</p>
        </div>
      );
    }

    if (!initialState) {
      return (
        <div className={styles.centeredFlex}>
          <p>Page not found</p>
        </div>
      );
    }

    return <Component {...props} initialState={initialState} />;
  };
};
