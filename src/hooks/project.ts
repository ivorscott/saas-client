import { useQuery, useQueryClient, useMutation } from "react-query";
import { client as api } from "../services/APIService";
import { Project } from "../features/Project/types";
import { history } from "../features/App/history";

export function useProject(projectId: string) {
  return useQuery<Project, Error>(
    ["project", projectId],
    async () => await api.get(`/projects/${projectId}`)
  );
}

export function useProjects() {
  return useQuery<Project[], Error>(
    "projects",
    async () => await api.get("/projects")
  );
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Project, Error, string>(
    (name) => api.post("/projects", { name }),
    {
      onSuccess: (data, variable) => {
        queryClient.setQueryData(["projects", { name: variable }], data);
        history.push(`/manage/projects/${data.id}`);
      },
    }
  );
  return [mutate];
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Project,
    Error,
    {
      id: string;
      active?: boolean;
      public?: boolean;
      description?: string;
      name?: string;
      columnOrder?: string[];
    }
  >(
    ({ id, ...rest }) =>
      api.patch(`/projects/${id}`, {
        ...rest,
      }),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["project", data.id], data);
      },
    }
  );
  return [mutate];
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<null, Error, string>(
    (id) => api.delete(`/projects/${id}`),
    {
      onSuccess: async (_, projectId) => {
        await queryClient.invalidateQueries(["project", projectId], {
          refetchActive: false,
          refetchInactive: false,
        });
        await queryClient.invalidateQueries("projects");
      },
    }
  );
  return [mutate];
}
