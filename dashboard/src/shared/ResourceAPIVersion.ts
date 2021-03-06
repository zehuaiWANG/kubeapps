// We explicitly define the apiVersions here, just in case a generic pluralizer
// isn't sufficient. Note that apiVersions may change over time.
export const ResourceKindsWithAPIVersions = {
  ClusterRole: "rbac.authorization.k8s.io/v1",
  ConfigMap: "v1",
  DaemonSet: "apps/v1",
  Deployment: "apps/v1",
  Ingress: "extensions/v1beta1",
  Secret: "v1",
  Service: "v1",
  StatefulSet: "apps/v1",
  Pods: "v1",
} as const;

export type ResourceAPIVersion = keyof typeof ResourceKindsWithAPIVersions;
