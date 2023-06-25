<script lang="ts" setup>
import { IRegisterDTO } from "blog-interface";
import { useApi } from "../composables/userApiFetch";

type Props = {
  isOpen: boolean;
};

const body = reactive<IRegisterDTO>({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emits = defineEmits(["dismiss"]);

const submit = async () => {
  useApi("auth/register", {
    method: "POST",
    body,
  })
    .then(() => {
      alert("회원가입이 완료되었습니다.");
      emits("dismiss");
    })
    .catch((err) => {});
};
</script>

<template>
  <Modal :is-open="isOpen" title="회원가입" @dismiss="emits('dismiss')">
    <div class="w-[30rem] flex flex-col gap-4 p-6">
      <InputText
        icon="ic:baseline-person"
        placeholder="이름을 입력하세요."
        v-model="body.name"
      />
      <InputText
        icon="ic:baseline-account-circle"
        placeholder="이메일을 입력하세요."
        v-model="body.email"
      />
      <InputText
        type="password"
        icon="ic:baseline-lock"
        placeholder="비밀번호를 입력하세요."
        v-model="body.password"
      />
      <InputText
        type="password"
        icon="ic:baseline-lock"
        placeholder="비밀번호를 한번 더 입력하세요."
        v-model="body.passwordConfirm"
      />
      <Button :expand="true" @click="submit()">회원가입</Button>
    </div>
  </Modal>
</template>
