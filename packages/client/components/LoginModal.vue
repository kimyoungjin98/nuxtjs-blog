<script lang="ts" setup>
import { ILoginDTO, ITokenDTO } from "blog-interface";
import { useApi } from "~/composables/userApiFetch";
import { useAuthStore } from "~/store/auth.store";

type Props = {
  isOpen: boolean;
};

const body = reactive<ILoginDTO>({
  email: "",
  password: "",
});

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emits = defineEmits(["dismiss"]);

const submit = () => {
  useApi<ITokenDTO>("auth/login", {
    method: "POST",
    body,
  })
    .then((res) => {
      const accessToken = useCookie("accessToken");
      const refreshToken = useCookie("refreshToken");
      accessToken.value = res.accessToken;
      refreshToken.value = res.refreshToken;

      useAuthStore().fetchUser();
      alert("로그인이 완료되었습니다.");
      emits("dismiss");
    })
    .catch((err) => {});
};
</script>

<template>
  <Modal :is-open="isOpen" title="로그인" @dismiss="emits('dismiss')">
    <div class="w-[30rem] flex flex-col gap-4 p-6">
      <InputText
        v-model="body.email"
        icon="ic:baseline-account-circle"
        placeholder="이메일을 입력하세요."
      />
      <InputText
        v-model="body.password"
        type="password"
        icon="ic:baseline-lock"
        placeholder="비밀번호를 입력하세요."
      />
      <div class="flex w-full justify-between">
        <Checkbox label="로그인 상태 유지" />
        <Button type="text" @click="emits('dismiss', 'register')"
          >회원가입</Button
        >
      </div>
      <Button :expand="true" @click="submit()">로그인</Button>
    </div>
  </Modal>
</template>
