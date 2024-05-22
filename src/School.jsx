import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function School(props) {
  const { regija, obcina, naziv, naslov, postna_stevilka, posta, email } =
    props.data;
  return (
    <p>
      <Card className="">
        <CardHeader>
          <CardTitle>{naziv}</CardTitle>
          <CardDescription>{naslov}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Občina: {obcina}</p>
          <p className="">Poštna številka: {postna_stevilka}</p>
          <p href={`mailto:${email}`}>{email}</p>
        </CardContent>
        <CardFooter>{/*<p>Card Footer</p>*/}</CardFooter>
      </Card>
    </p>
  );
}
