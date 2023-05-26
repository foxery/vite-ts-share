<template></template>

<script setup lang="ts">
// const ErrorDecorator: MethodDecorator = (
//   target: Object,
//   propertyKey: string | symbol,
//   descriptor: PropertyDescriptor
// ) => {
//   const sourceMethod = descriptor.value;
//   descriptor.value = async function (...args: any) {
//     try {
//       await sourceMethod.apply(this, args);
//     } catch (error) {
//       console.error(error);
//       // todo
//     }
//   };
// };

class Data {
  getData(): Promise<{ name: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ name: "zhang san" });
        } else {
          reject({ error: "error" });
        }
      }, 1000);
    });
  }

  //   @ErrorDecorator
  async fetch() {
    try {
      const res = await this.getData();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  del(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("delete success");
        } else {
          reject("delete error");
        }
      }, 1000);
    });
  }

  //   @ErrorDecorator
  async onDel() {
    try {
      const res = await this.del();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

const data = new Data();
data.fetch();
</script>

<style scoped></style>
