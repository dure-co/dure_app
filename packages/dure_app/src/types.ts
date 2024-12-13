export interface CommentDefinition {
  user: string;
  time_ago: string;
  content: string;
  comments: CommentDefinition[];
}

export interface StoryDefinition {
  id: string;
  points: string;
  url: string;
  title: string;
  domain: string;
  type: string;
  time_ago: string;
  user: string;
  comments_count: number;
  comments: CommentDefinition[];
}

export interface UserDefinition {
  error: string;
  id: string;
  created: string;
  karma: number;
  about: string;
}

export type StoryTypes = "top" | "new" | "show" | "ask" | "job";

import { BaseAppearance, BaseAuth } from "@supabase/auth-ui-shared";
import { JSXElement } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

export type FormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};

export interface Appearance extends BaseAppearance {
  style?: {
    anchor?: JSX.CSSProperties;
    button?: JSX.CSSProperties;
    container?: JSX.CSSProperties;
    divider?: JSX.CSSProperties;
    input?: JSX.CSSProperties;
    label?: JSX.CSSProperties;
    loader?: JSX.CSSProperties;
    message?: JSX.CSSProperties;
  };
}

export interface Auth extends BaseAuth {
  children?: JSXElement;
  appearance?: Appearance;
}
