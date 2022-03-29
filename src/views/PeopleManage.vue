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
import { getPeople, deletePeople } from "../apis/people";
import { PeopleItem, PeopleList } from "../types/types";
import { NButton, useMessage, DataTableColumns, NDataTable } from "naive-ui";

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
      title: "PhoneNum",
      key: "phoneNum",
      align: "center",
    },
    {
      title: "Email",
      key: "email",
      align: "center",
    },
    /*     {
      title: "Time",
      key: "time",
      align: "center",
    }, */
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
    const allpeople: PeopleItem[] = [];
    onMounted(() => {
      getPeople({
        page: paginationReactive.page,
        size: paginationReactive.pageSize,
      }).then((data: any) => {
        data.data.list.map((item: any) => {
          //console.log(item);
          const peopleItem: any = {};
          peopleItem.id = item.id;
          peopleItem.username = item.username;
          peopleItem.phoneNum = item.phoneNum;
          peopleItem.email = item.email;
          peopleItem.gender = item.gender == false ? "女" : "男";
          allpeople.push(peopleItem);
        });
        dataRef.value = allpeople;
        paginationReactive.pageCount = data.data.pages;
        loadingRef.value = false;
      });
    });

    /*     function query(page: number, pageSize = 10) {
      return new Promise((resolve) => {
        const pagedData = usersInfo.slice(
          (page - 1) * pageSize,
          page * pageSize
        );
        const pageCount = Math.ceil(usersInfo.length / pageSize);
        resolve({
          pageCount,
          data: pagedData,
        });
      });
    } */

    function handlePageChange(currentPage) {
      if (!loadingRef.value) {
        loadingRef.value = true;
        getPeople({
          page: currentPage,
          size: paginationReactive.pageSize,
        }).then((data) => {
          console.log(data.data.list);
          //console.log(data);
          dataRef.value = data.data.list;
          paginationReactive.page = currentPage;
          paginationReactive.pageCount = data.data.pages;
          loadingRef.value = false;
        });
      }
    }

    function rowKey(rowData) {
      return rowData.id;
    }
    return {
      data: dataRef,
      rowKey,
      columns: columnsRef.value({
        Delete(rowData: Song) {
          const data = rowData.id;
          deletePeople(data).then((res) => {
            if (res.status === 0) {
              //window.location.reload();

              //console.log(dataRef.value.length);
              /* for (let i = 0; i < dataRef.value.length; i++) {
                if ((dataRef.value[i].id = data)) {
                  dataRef.value[i] = null;
                }
              } */

              const newArr = dataRef.value.filter((item) => item.id != data);
              //console.log(newArr);
              dataRef.value = newArr;
              //console.log(dataRef.value);
              message.info(`删除成功`);
            } else if (res.status === 1) {
              message.error(`删除失败`);
            }
          });
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
