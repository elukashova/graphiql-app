import { IntrospectionType } from 'graphql';

export type OnSelectItem = (item: IntrospectionType) => void;

export type OnSelectRoot = (name: string) => void;
