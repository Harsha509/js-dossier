// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: options.proto

package com.github.jsdossier.proto;

public final class Options {
  private Options() {}
  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistry registry) {
    registry.add(com.github.jsdossier.proto.Options.sanitized);
  }
  public static final int SANITIZED_FIELD_NUMBER = 51230;
  /**
   * <code>extend .google.protobuf.FieldOptions { ... }</code>
   */
  public static final
    com.google.protobuf.GeneratedMessage.GeneratedExtension<
      com.google.protobuf.DescriptorProtos.FieldOptions,
      com.github.jsdossier.proto.SanitizedContent> sanitized = com.google.protobuf.GeneratedMessage
          .newFileScopedGeneratedExtension(
        com.github.jsdossier.proto.SanitizedContent.class,
        com.github.jsdossier.proto.SanitizedContent.getDefaultInstance());
  static com.google.protobuf.Descriptors.Descriptor
    internal_static_dossier_options_SanitizedContent_descriptor;
  static
    com.google.protobuf.GeneratedMessage.FieldAccessorTable
      internal_static_dossier_options_SanitizedContent_fieldAccessorTable;

  public static com.google.protobuf.Descriptors.FileDescriptor
      getDescriptor() {
    return descriptor;
  }
  private static com.google.protobuf.Descriptors.FileDescriptor
      descriptor;
  static {
    java.lang.String[] descriptorData = {
      "\n\roptions.proto\022\017dossier.options\032\020descri" +
      "ptor.proto\"9\n\020SanitizedContent\022\r\n\003uri\030\001 " +
      "\001(\010H\000\022\016\n\004html\030\002 \001(\010H\000B\006\n\004kind:U\n\tsanitiz" +
      "ed\022\035.google.protobuf.FieldOptions\030\236\220\003 \001(" +
      "\0132!.dossier.options.SanitizedContentB\036\n\032" +
      "com.github.jsdossier.protoP\001b\006proto3"
    };
    com.google.protobuf.Descriptors.FileDescriptor.InternalDescriptorAssigner assigner =
        new com.google.protobuf.Descriptors.FileDescriptor.    InternalDescriptorAssigner() {
          public com.google.protobuf.ExtensionRegistry assignDescriptors(
              com.google.protobuf.Descriptors.FileDescriptor root) {
            descriptor = root;
            return null;
          }
        };
    com.google.protobuf.Descriptors.FileDescriptor
      .internalBuildGeneratedFileFrom(descriptorData,
        new com.google.protobuf.Descriptors.FileDescriptor[] {
          com.google.protobuf.DescriptorProtos.getDescriptor(),
        }, assigner);
    internal_static_dossier_options_SanitizedContent_descriptor =
      getDescriptor().getMessageTypes().get(0);
    internal_static_dossier_options_SanitizedContent_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessage.FieldAccessorTable(
        internal_static_dossier_options_SanitizedContent_descriptor,
        new java.lang.String[] { "Uri", "Html", "Kind", });
    sanitized.internalInit(descriptor.getExtensions().get(0));
    com.google.protobuf.DescriptorProtos.getDescriptor();
  }

  // @@protoc_insertion_point(outer_class_scope)
}