<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="true"
    :single-line="false"
    align="center"
  />
</template>
<script lang="ts">
import { h, defineComponent } from "vue";
import { NButton, useMessage, DataTableColumns, NDataTable } from "naive-ui";
type DataTableSortState = {
  align: "center";
};
type Song = {
  id: number;
  username: string;
  password: string;
  phonenum: string;
  email: string;
  gender: string;
};

const createColumns = ({
  play,
}: {
  play: (row: Song) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "Id",
      key: "id",
    },
    {
      title: "Username",
      key: "username",
    },
    {
      title: "Password",
      key: "password",
    },
    {
      title: "Phonenum",
      key: "phonenum",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row),
          },
          { default: () => "Play" }
        );
      },
    },
  ];
};

const data: Song[] = [
  {
    id: 3,
    username: "zhangsan",
    password: "000",
    phonenum: "123456",
    email: "xx@163.com",
    gender: "man",
  },
  {
    id: 4,
    username: "lisi",
    password: "111",
    phonenum: "147258",
    email: "yy@163.com",
    gender: "woman",
  },
  {
    id: 12,
    username: "wangwu",
    password: "888",
    phonenum: "169875",
    email: "zz@163.com",
    gender: "man",
  },
];

export default defineComponent({
  name: "OrderManage",
  components: {
    NDataTable,
  },
  setup() {
    const message = useMessage();

    return {
      data,
      columns: createColumns({
        play(row: Song) {
          message.info(`Play ${row.username}`);
        },
      }),
      pagination: false as const,
    };
  },
});
/* export default {
  name: "OrderManage",
  setup() {},
}; */
</script>

<style lang="scss"></style>
