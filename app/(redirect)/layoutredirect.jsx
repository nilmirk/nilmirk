import { redirect } from "next/navigation";
export default function Redirect(props) {
  redirect(`${props.link}`);
}