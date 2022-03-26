<template>
  <n-data-table
    ref="table"
    :remote="true"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    :bordered="true"
    :single-line="false"
    @update:page="handlePageChange"
  />
</template>
<script lang="ts">
import { h, defineComponent, ref, reactive, onMounted } from "vue";
import { usersInfo } from "../data/index";
import { NButton, useMessage, DataTableColumns, NDataTable } from "naive-ui";
type DataTableSortState = {
  align: "center";
};
type Song = {
  id: number;
  username: string;
  gender: string;
  phonenum: string;
  email: string;
  time: string;
};

const createColumns = ({
  Delete,
}: {
  Delete: (row: Song) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "Id",
      key: "id",
      align: "center",
    },
    {
      title: "Username",
      key: "username",
      align: "center",
    },
    {
      title: "Gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Phonenum",
      key: "phonenum",
      align: "center",
    },
    {
      title: "Email",
      key: "email",
      align: "center",
    },
    {
      title: "Time",
      key: "time",
      align: "center",
    },
    {
      title: "Action",
      key: "actions",
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            size: "small",
            type: "error",
            onClick: () => Delete(row),
          },
          { default: () => "Delete" }
        );
      },
    },
  ];
};

function query(page: number, pageSize = 10) {
  return new Promise((resolve) => {
    const pagedData = usersInfo.slice((page - 1) * pageSize, page * pageSize);
    const pageCount = Math.ceil(usersInfo.length / pageSize);
    resolve({
      pageCount,
      data: pagedData,
    });
  });
}

export default defineComponent({
  name: "PeopleManage",
  components: {
    NDataTable,
  },
  setup() {
    const message = useMessage();
    const dataRef = ref([]);
    const loadingRef = ref(true);
    const columnsRef = ref(createColumns);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
    });

    onMounted(() => {
      query(paginationReactive.page, paginationReactive.pageSize).then(
        (data: any) => {
          console.log(data);
          dataRef.value = data.data;
          paginationReactive.pageCount = data.pageCount;
          loadingRef.value = false;
        }
      );
    });

    function handlePageChange(currentPage) {
      if (!loadingRef.value) {
        loadingRef.value = true;
        query(currentPage, paginationReactive.pageSize).then((data: any) => {
          dataRef.value = data.data;
          paginationReactive.page = currentPage;
          paginationReactive.pageCount = data.pageCount;
          loadingRef.value = false;
        });
      }
    }

    function rowKey(rowData) {
      return rowData.columns;
    }

    return {
      data: dataRef,
      rowKey,
      columns: columnsRef.value({
        Delete(row: Song) {
          message.info(`Delete ${row.id}`);
        },
      }),
      pagination: paginationReactive,
      loading: loadingRef,
      handlePageChange,
      /*       rowKey(rowData) {
        return rowData.columns;
      }, */
      /*       columns: createColumns({
        Delete(row: Song) {
          message.info(`Delete ${row.username}`);
        },
      }),
      pagination: false as const, */
    };
  },
});
/* export default {
  name: "OrderManage",
  setup() {},
}; */
</script>

<style lang="scss"></style>
