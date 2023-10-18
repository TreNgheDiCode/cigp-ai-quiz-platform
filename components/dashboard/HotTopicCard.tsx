import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {};

const HotTopicCard = (props: Props) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>Click on a topic</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">Word Cloud</CardContent>
    </Card>
  );
};

export default HotTopicCard;
