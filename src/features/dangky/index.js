import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Participant from "./component/Participant";
export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //  firstName: "test",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Participant></Participant>
    </>
  );
}
