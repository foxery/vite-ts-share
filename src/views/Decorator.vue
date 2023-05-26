<template>
  <div>
    <input type="text" v-model="user.name" placeholder="name" />
    <!-- <input type="text" v-model="user.email" placeholder="email" />
    <input type="text" v-model="user.password" placeholder="password" /> -->
    <!-- <button @click="onSubmit">提交</button> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {
  validate,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
// import { IsEmail, MinLength } from "class-validator";

// function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: "isLongerThan",
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [property],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           const [relatedPropertyName] = args.constraints;
//           const relatedValue = (args.object as any)[relatedPropertyName];
//           return (
//             typeof value === "string" &&
//             typeof relatedValue === "string" &&
//             value.length > relatedValue.length
//           ); 
//         },
//       },
//     });
//   };
// }

function isRequire() {
  return (target: any, key: any) => {
    let value = target[key];
    const getter = () => value;
    const setter = (val: unknown) => {
      if (isEmpty(val)) {
        console.error(`${key}不能为空`);
      }
      value = val;
    };
    Reflect.defineProperty(target, key, {
      get: getter,
      set: setter,
    });
  };
}

const isEmpty = (value: unknown): boolean => {
  return value === "" || value === null || value === undefined;
};

class User {
  // @IsEmail()
  // email = "";

  // @MinLength(3)
  // password = "";

  // @IsLongerThan("name", {
  //   message: "Text must be longer than the name",
  // })
  // text = "1";

  @isRequire()
  name = "";
}

const user = reactive(new User());

const errors = ref();

// onMounted(() => {
//   validateUser();
// });

// const validateUser = async () => {
//   try {
//     errors.value = await validate(user);
//   } catch (error) {}
//   console.log(errors.value);
// };

// const onSubmit = () => {
//   validateUser();
// };
</script>
